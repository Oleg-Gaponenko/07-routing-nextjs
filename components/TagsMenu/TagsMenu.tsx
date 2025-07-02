'use client';

import css from './TagsMenu.module.css';
import Link from 'next/link';
import { NoteTag } from '../../types/note';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
