import { type ReactNode } from "react";

export type MerchGenericLayoutProps = {
  title: string;
  subtitle?: string;
  body: ReactNode;
  footer?: ReactNode;
};

export default function MerchGenericLayout({
  title,
  subtitle,
  body,
  footer,
}: MerchGenericLayoutProps) {
  return (
    <section className="grow flex flex-col md:px-10 lg:px-24">
      <article className="flex-1 p-5 pt-10 space-y-4">
        <hgroup>
          <h1 className="text-gtd-primary-30 font-semibold text-3xl mb-1">
            {title}
          </h1>
          {!!subtitle && <p className="text-sm font-light">{subtitle}</p>}
        </hgroup>
        {body}
      </article>
      {footer}
    </section>
  );
}
