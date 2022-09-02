import React, { Fragment } from "react";
import styles from "./index.module.scss";

const data = [
  {
    year: 2022,
    list: [
      { date: "08-21", title: "我哈哈哈哈哈哈", url: "" },
      { date: "07-01", title: "dasdasd实打实大撒打算", url: "" },
    ],
  },
  {
    year: 2021,
    list: [
      { date: "04-31", title: "甜味儿沃尔沃二", url: "" },
      { date: "07-01", title: "阿斯达世贸大厦大", url: "" },
    ],
  },
];

/*获取对象数组的长度*/
function getArrLength(arr) {
  let count = 0;
  let titleArr = [];
  arr.map((item, index) => {
    count += item.list.length + 1;
    titleArr.push({ year: item.year });
    if (item.list?.length) {
      item.list.map((item1, index1) => {
        titleArr.push(item.list[index1]);
      });
    }
  });
  const countArr = Array.from({ length: count - 1 }, (v, k) => k);
  return {
    countArr,
    titleArr,
  };
}

export default function ProcessLine() {
  const { countArr, titleArr } = getArrLength(data);

  return (
    <div className={styles.processLine}>
      <div className={styles.line}>
        {countArr.map((item, index) => (
          <div key={index} className={styles.lineItem}>
            <div className={styles.linePoint}></div>
            {index === countArr.length - 1 && (
              <div className={styles.lastLinePoint}></div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        {titleArr.map((item, index) => (
          <div className={styles.contentItem} key={index}>
            {item?.year ? (
              <div className={styles.year}>{item?.year} 年</div>
            ) : (
              <div className={styles.title}>
                <span className={styles.date}>{item?.date}</span>
                <span className={styles.text}>{item?.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
