import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
import { randomUUID } from "crypto";
import formData from "form-data";
import Mailgun from "mailgun.js";

const API_KEY = process.env.MAILGUN_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, username } = RegisterSchema.parse(data); // usign zod to validate credentials

    const exsistingEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (exsistingEmail) {
      return NextResponse.json({
        user: null,
        message: "A user with the same email already exists",
        status: 409,
      });
    }
    const exsistingUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (exsistingUsername) {
      return NextResponse.json({
        user: null,
        message: "A user with the same username already exists",
        status: 409,
      });
    }

    const encryptedPsw = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: encryptedPsw,
      },
    });

    const token = await prisma?.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        userId: newUser.id,
      },
    });

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const messageData = {
      from: "Excited User <me@samples.mailgun.org>",
      to: newUser.email,
      subject: "Thanks for registering",
      html: `
      <h1>Thank You for Registering!</h1>
      <p>Hi ${newUser.username},</p>
      <p>We're thrilled to have you on board. To get started, please confirm your email by clicking the following link:</p>
      <a href="http://localhost:3000/api/activate/${token?.token}">Activate Your Account</a>
      <p>If you didn't register on our platform, please ignore this email.</p>
      <p>Happy exploring!</p>
    `,
    };

    client.messages
      .create(DOMAIN, messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    const { password: newPassword, ...rest } = newUser;

    return NextResponse.json({
      user: rest,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
