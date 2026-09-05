"use client";

import Image from "next/image";
import { ArrowsOut, X } from "@phosphor-icons/react";
import { useRef } from "react";
import styles from "./guides.module.css";

export function GuideImage({ src, alt, caption, width, height }: { src: string; alt: string; caption: string; width: number; height: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <figure className={styles.figure}>
      <button aria-label={`放大图片：${alt}`} className={styles.imageButton} onClick={() => dialog.current?.showModal()} type="button"><Image alt={alt} height={height} sizes="(max-width: 809px) 92vw, 680px" src={src} width={width} /><span><ArrowsOut aria-hidden size={16} />点击放大</span></button>
      <figcaption>{caption}</figcaption>
      <dialog aria-label={alt} className={styles.imageDialog} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} ref={dialog}>
        <button aria-label="关闭图片" className={styles.closeImage} onClick={() => dialog.current?.close()} type="button"><X aria-hidden size={22} /></button>
        <Image alt={alt} height={height} sizes="95vw" src={src} width={width} />
      </dialog>
    </figure>
  );
}
