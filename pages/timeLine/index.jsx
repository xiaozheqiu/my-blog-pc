import React from "react";
import Layout from "../../components/layout";
import ProcessLine from "../../components/processLine";
import styles from "../../styles/timeLine.module.scss";
export default function TimeLine() {
  return (
    <Layout>
      <div className={styles.timeLine}>
        <ProcessLine />
      </div>
    </Layout>
  );
}
