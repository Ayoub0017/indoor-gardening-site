"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TableOfContentsProps {
    content: string;
    className?: string;
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // extract headings from markdown
        const regex = /^(#{2,4})\s+(.+)$/gm;
        const extracted: Heading[] = [];
        let match;

        while ((match = regex.exec(content)) !== null) {
            const level = match[1].length;
            const text = match[2];
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            extracted.push({ id, text, level });
        }

        setHeadings(extracted);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        const headingElements = document.querySelectorAll('h2, h3, h4');
        headingElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className={cn("sticky top-24 max-h-[calc(100vh-100px)] overflow-auto p-4", className)}>
            <h4 className="font-semibold mb-4 text-sm text-gray-900 uppercase tracking-wider">On this page</h4>
            <ul className="space-y-1">
                {headings.map((heading) => (
                    <li key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
                        <Link
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                            className={cn(
                                "block text-sm py-1 border-l-2 pl-3 transition-colors hover:text-green-600 hover:border-green-600",
                                activeId === heading.id
                                    ? "border-green-600 text-green-700 font-medium"
                                    : "border-transparent text-gray-500"
                            )}
                        >
                            {heading.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
