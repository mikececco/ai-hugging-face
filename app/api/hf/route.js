import { NextResponse } from "next/server";
import { inference } from "@/app/utils/hf";
import { parse } from 'url';

export async function POST(request) {
  const { query } = parse(request.url, true);
  const type = query.type;

  try {
    const formData = await request.formData();

    if (type === "comp") { // completion MISTRAL
      let message = formData.get("message");

      if (!message) {
        return NextResponse.json(
          { error: "Message is required" },
          { status: 400 }
        );
      }

      const out = await inference.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1000,
      });

      console.log(out.choices[0].message);

      return NextResponse.json(
        { message: out.choices[0].message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid type parameter" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
