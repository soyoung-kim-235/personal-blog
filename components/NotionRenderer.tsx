import React from "react";
import Image from "next/image";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type RichText = { plain_text: string; href?: string | null };

function getRichText(block: BlockObjectResponse): RichText[] {
  const t = block.type;
  const content = block[t as keyof typeof block];
  if (content && typeof content === "object" && "rich_text" in content) {
    return (content as { rich_text: RichText[] }).rich_text;
  }
  return [];
}

function renderRichText(richText: RichText[]) {
  return richText.map((r, i) => {
    if (r.href) {
      return (
        <a
          key={i}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline dark:text-blue-400"
        >
          {r.plain_text}
        </a>
      );
    }
    return <span key={i}>{r.plain_text}</span>;
  });
}

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
}

function BlockEl({
  block,
  richText,
  text,
}: {
  block: BlockObjectResponse;
  richText: RichText[];
  text: string;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {renderRichText(richText)}
          {!text && <br />}
        </p>
      );
    case "heading_1":
      return (
        <h1 className="mt-8 text-2xl font-bold text-neutral-900 dark:text-white">
          {text}
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="mt-6 text-xl font-bold text-neutral-900 dark:text-white">
          {text}
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
          {text}
        </h3>
      );
    case "bulleted_list_item":
      return <li className="ml-4 list-disc">{renderRichText(richText)}</li>;
    case "numbered_list_item":
      return <li className="ml-4 list-decimal">{renderRichText(richText)}</li>;
    default:
      return null;
  }
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  if (!blocks.length) return null;

  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const richText = getRichText(block);
    const text = richText.map((r) => r.plain_text).join("");

    if (block.type === "bulleted_list_item") {
      const list: BlockObjectResponse[] = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        list.push(blocks[i]);
        i++;
      }
      nodes.push(
        <ul key={block.id} className="list-disc space-y-1 pl-6">
          {list.map((b) => {
            const rt = getRichText(b);
            return (
              <li key={b.id} className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                {renderRichText(rt)}
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    if (block.type === "numbered_list_item") {
      const list: BlockObjectResponse[] = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        list.push(blocks[i]);
        i++;
      }
      nodes.push(
        <ol key={block.id} className="list-decimal space-y-1 pl-6">
          {list.map((b) => {
            const rt = getRichText(b);
            return (
              <li key={b.id} className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                {renderRichText(rt)}
              </li>
            );
          })}
        </ol>
      );
      continue;
    }

    switch (block.type) {
      case "paragraph":
        nodes.push(
          <div key={block.id}>
            <BlockEl block={block} richText={richText} text={text} />
          </div>
        );
        break;
      case "heading_1":
      case "heading_2":
      case "heading_3":
        nodes.push(
          <div key={block.id}>
            <BlockEl block={block} richText={richText} text={text} />
          </div>
        );
        break;
      case "quote":
        nodes.push(
          <blockquote
            key={block.id}
            className="border-l-4 border-neutral-300 pl-4 italic text-neutral-600 dark:border-neutral-600 dark:text-neutral-400"
          >
            {renderRichText(richText)}
          </blockquote>
        );
        break;
      case "code": {
        const codeContent = block.code;
        const lang = codeContent?.language || "plain";
        const code = codeContent?.rich_text?.map((r) => r.plain_text).join("") ?? "";
        nodes.push(
          <pre
            key={block.id}
            className="overflow-x-auto rounded-lg bg-neutral-100 p-4 text-sm dark:bg-neutral-800"
          >
            <code data-language={lang}>{code}</code>
          </pre>
        );
        break;
      }
      case "divider":
        nodes.push(<hr key={block.id} className="my-6 border-neutral-200 dark:border-neutral-700" />);
        break;
      case "image": {
        const img = block.image;
        const src =
          img?.type === "external"
            ? img.external?.url
            : img?.type === "file"
              ? img.file?.url
              : null;
        const cap = img?.caption?.[0]?.plain_text;
        if (src) {
          nodes.push(
            <figure key={block.id} className="my-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={src}
                  alt={cap || "Image"}
                  fill
                  className="object-contain"
                  unoptimized={src.includes("notion")}
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
              {cap && (
                <figcaption className="mt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  {cap}
                </figcaption>
              )}
            </figure>
          );
        }
        break;
      }
      case "callout": {
        const callout = block.callout;
        const icon = callout?.icon?.emoji;
        nodes.push(
          <div
            key={block.id}
            className="flex gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50"
          >
            {icon && <span className="text-lg">{icon}</span>}
            <div className="flex-1">{renderRichText(richText)}</div>
          </div>
        );
        break;
      }
      case "to_do": {
        const todo = block.to_do;
        const checked = todo?.checked ?? false;
        nodes.push(
          <label key={block.id} className="flex items-center gap-2">
            <input type="checkbox" defaultChecked={checked} disabled className="rounded" />
            <span className={checked ? "text-neutral-500 line-through dark:text-neutral-400" : ""}>
              {renderRichText(richText)}
            </span>
          </label>
        );
        break;
      }
      default:
        if (text) {
          nodes.push(
            <p key={block.id} className="text-neutral-600 dark:text-neutral-400">
              {text}
            </p>
          );
        }
    }
    i++;
  }

  return <div className="notion-content space-y-4">{nodes}</div>;
}
