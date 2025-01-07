import { component$ } from '@builder.io/qwik';
import Link from '~/common/components/link/link';

import { ol, li, title, status, preview } from './list.module.css';

export type ObservatoryItem = {
  title: string;
  status?: 'Experimental' | 'Beta';
  shortPreview: string;
  href: string;
};

type ObservatoryListProps = {
  items: ObservatoryItem[];
};

export default component$(({ items }: ObservatoryListProps) => {
  return (
    <ol class={ol}>
      {items.map((item) => (
        <li key={item.title} class={li}>
          <div class={title}>
            {item.title}
            {item.status && <span class={status}> — {item.status}</span>}
          </div>
          <p class={preview}>{item.shortPreview}</p>
          <Link href={item.href}>
            Read more
          </Link>
        </li>
      ))}
    </ol>
  );
});