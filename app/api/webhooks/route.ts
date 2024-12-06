import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { syncClerkToAppwrite } from "@/lib/user-sync";

export async function POST(req: NextRequest) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!CLERK_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const payload = await req.text();
    const headers = Object.fromEntries(req.headers.entries());
    const svixId = headers['svix-id'];
    const svixTimestamp = headers['svix-timestamp'];
    const svixSignature = headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    const webhook = new Webhook(CLERK_WEBHOOK_SECRET);
    const event = webhook.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature
    }) as {
      type: string;
      data: { id: string };
    };

    switch (event.type) {
      case 'user.created':
      case 'user.updated':
        try {
          const clerk = await clerkClient();
          const user = await clerk.users.getUser(event.data.id);
          
          if (user) {
            await syncClerkToAppwrite(user);
            console.log(`User ${event.type}: ${user.id}`);
          } else {
            console.warn(`No user found for ID: ${event.data.id}`);
          }
        } catch (userError) {
          console.error('Error retrieving or syncing user:', userError);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}











// import { Webhook } from "svix";
// import { NextRequest, NextResponse } from "next/server";
// import { clerkClient } from "@clerk/nextjs/server";
// import { syncClerkToAppwrite } from "@/lib/user-sync";

// export async function POST(req: NextRequest) {
//   const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
//   if (!CLERK_WEBHOOK_SECRET) {
//     return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
//   }

//   try {
//     const payload = await req.text();
//     const headers = Object.fromEntries(req.headers.entries());
//     const svixId = headers['svix-id'];
//     const svixTimestamp = headers['svix-timestamp'];
//     const svixSignature = headers['svix-signature'];

//     if (!svixId || !svixTimestamp || !svixSignature) {
//       return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
//     }

//     const webhook = new Webhook(CLERK_WEBHOOK_SECRET);
//     const event = webhook.verify(payload, {
//       'svix-id': svixId,
//       'svix-timestamp': svixTimestamp,
//       'svix-signature': svixSignature
//     }) as {
//       type: string;
//       data: { id: string };
//     };

//     switch (event.type) {
//       case 'user.created':
//       case 'user.updated':
//         const clerk = await clerkClient();
//         const user = await clerk.users.getUser(event.data.id);
//         await syncClerkToAppwrite(user);
//         console.log(`User ${event.type}: ${user.id}`);
//         break;

//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     return NextResponse.json({ status: 'success' }, { status: 200 });
//   } catch (error) {
//     console.error('Webhook processing error:', error);
//     return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
//   }
// }



