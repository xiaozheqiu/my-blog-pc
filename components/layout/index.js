import Head from "next/head";
import Image from "next/image";

import styles from "./index.module.scss";
import Header from "./components/Header";

import React, { useEffect } from "react";
/*
 * 整体框架布局
 */
export default function Layout(props) {
  const { children } = props;

  useEffect(() => {}, []);

  return (
    <div className={styles.container} id={"container"}>
      <Head>
        <title>小折秋</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
          <div>Copyright © 2022 XiaoZheQiu</div>
        </a>
      </footer>
    </div>
  );
}
