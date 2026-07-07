import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Reuse or initialize the app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add required Gmail scopes
provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/gmail.compose');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Listen to Auth changes and manage local state
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Credentials');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// --- GMAIL API WRAPPER METHODS ---

export interface GmailMessageMetadata {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
}

export interface GmailMessageDetails {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
}

// Safely decodes base64 strings containing UTF-8 characters
function decodeBase64Utf8(base64Str: string): string {
  try {
    const normalized = base64Str.replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(normalized);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      bytes[i] = raw.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (err) {
    try {
      return atob(base64Str.replace(/-/g, '+').replace(/_/g, '/'));
    } catch {
      return base64Str;
    }
  }
}

// Deeply searches the email payload structure to extract text/html or text/plain body content
function extractBody(payload: any): string {
  if (!payload) return "";
  
  if (payload.body && payload.body.data) {
    return decodeBase64Utf8(payload.body.data);
  }

  if (payload.parts) {
    // Prefer HTML body parts over plain text
    let plainTextPart = "";
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" && part.body && part.body.data) {
        return decodeBase64Utf8(part.body.data);
      }
      if (part.mimeType === "text/plain" && part.body && part.body.data) {
        plainTextPart = decodeBase64Utf8(part.body.data);
      }
    }
    
    if (plainTextPart) return plainTextPart;

    // Recursively check nested parts
    for (const part of payload.parts) {
      const body = extractBody(part);
      if (body) return body;
    }
  }

  return "";
}

/**
 * Fetch messages from Gmail inbox
 * Supports searching via direct queries
 */
export async function fetchGmailInbox(accessToken: string, query: string = ""): Promise<GmailMessageMetadata[]> {
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=12${query ? `&q=${encodeURIComponent(query)}` : ""}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch emails: ${res.statusText}`);
  }

  const data = await res.json();
  if (!data.messages || data.messages.length === 0) {
    return [];
  }

  const details = await Promise.all(
    data.messages.map(async (msg: { id: string; threadId: string }) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!detailRes.ok) return null;
        const detailData = await detailRes.json();

        const headers = detailData.payload?.headers || [];
        const subject = headers.find((h: any) => h.name === 'Subject')?.value || '(Без темы)';
        const from = headers.find((h: any) => h.name === 'From')?.value || 'Неизвестный';
        const date = headers.find((h: any) => h.name === 'Date')?.value || '';

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: detailData.snippet || '',
          subject,
          from,
          date,
        };
      } catch (err) {
        console.error('Error fetching message meta:', err);
        return null;
      }
    })
  );

  return details.filter((m): m is GmailMessageMetadata => m !== null);
}

/**
 * Fetch full email content by ID
 */
export async function fetchGmailMessage(accessToken: string, id: string): Promise<GmailMessageDetails> {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch email details: ${res.statusText}`);
  }

  const data = await res.json();
  const headers = data.payload?.headers || [];
  const subject = headers.find((h: any) => h.name === 'Subject')?.value || '(Без темы)';
  const from = headers.find((h: any) => h.name === 'From')?.value || 'Неизвестный';
  const to = headers.find((h: any) => h.name === 'To')?.value || '';
  const date = headers.find((h: any) => h.name === 'Date')?.value || '';
  
  const bodyContent = extractBody(data.payload);

  return {
    id: data.id,
    threadId: data.threadId,
    snippet: data.snippet || '',
    subject,
    from,
    to,
    date,
    body: bodyContent || data.snippet || '(Пустое письмо)',
  };
}

/**
 * Send email using MIME format
 */
export async function sendGmailMessage(
  accessToken: string,
  to: string,
  subject: string,
  body: string
): Promise<any> {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines = [
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body
  ];
  
  const email = emailLines.join('\r\n');
  const base64Email = btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: base64Email
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`Failed to send email: ${errorData.error?.message || res.statusText}`);
  }

  return res.json();
}
