import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";

import styles from "./Resume.module.css";

const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    achievement: information[sections.achievement],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],
    other: information[sections.other],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        onDragOver={() => seTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${styles.section} ${
          info.workExp?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.companyName ? (
                <p className={styles.subTitle}>{item.companyName}</p>
              ) : (
                <span />
              )}
              {item.certificationLink ? (
                <a className={styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)}-
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )}
              {item.location ? (
                <p className={styles.date}>
                  <MapPin /> Remote
                </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => seTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`${styles.section} ${
          info.project?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.link ? (
                <a className={styles.link} href={item.link}>
                  <Paperclip />
                  {item.link}
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a className={styles.link} href={item.github}>
                  <GitHub />
                  {item.github}
                </a>
              ) : (
                <span />
              )}
              {item.overview ? (
                <p className={styles.overview}>{item.overview} </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${styles.section} ${
          info.education?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          {info.education?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.college ? (
                <p className={styles.subTitle}>{item.college}</p>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        draggable
        onDragOver={() => seTarget(info.achievement?.id)}
        onDragEnd={() => setSource(info.achievement?.id)}
        className={`${styles.section} ${
          info.achievement?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          {info.achievement?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.achievement?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.achievement?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => seTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={`${styles.section} ${
          info.summary?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.summary?.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info.summary?.detail}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        draggable
        onDragOver={() => seTarget(info.other?.id)}
        onDragEnd={() => setSource(info.other?.id)}
        className={`${styles.section} ${
          info.other?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.other?.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info.other?.detail}</p>
        </div>
      </div>
    ),
  };

  useEffect(() => {
    setColumns((prevColumns) => {
      if (prevColumns[0].length === 0 && prevColumns[1].length === 0) {
        const column1 = [];
        const column2 = [];
        let turn = true;
        Object.keys(sectionDiv).forEach((key) => {
          if (turn) {
            column1.push(sectionDiv[key]);
            turn = false;
          } else {
            column2.push(sectionDiv[key]);
            turn = true;
          }
        });
        return [column1, column2];
      }
      const sourceColIndex = prevColumns[0].filter(
        (item) => item.key === source
      ).length
        ? 0
        : 1;
      const targetColIndex = prevColumns[0].filter(
        (item) => item.key === target
      ).length
        ? 0
        : 1;

      const sourceCol = [...prevColumns[sourceColIndex]];
      const targetCol = [...prevColumns[targetColIndex]];

      const sourceIndex = sourceCol.findIndex((item) => item.key === source);
      const targetIndex = targetCol.findIndex((item) => item.key === target);

      const temp = sourceCol[sourceIndex];
      sourceCol[sourceIndex] = targetCol[targetIndex];
      targetCol[targetIndex] = temp;

      if (sourceColIndex === targetColIndex) {
        return sourceColIndex === 0
          ? [sourceCol, prevColumns[1]]
          : [prevColumns[0], sourceCol];
      } else {
        return sourceColIndex === 0 ? [sourceCol, targetCol] : [targetCol, sourceCol];
      }
    });
  }, [source, target]);

  useEffect(() => {
    if (props.activeColor) {
      const color = props.activeColor;
      document.documentElement.style.setProperty("--color", color);
    }
  }, [props.activeColor]);

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>{info.basicInfo?.detail?.name}</p>
        <p className={styles.subHeading}>{info.basicInfo?.detail?.title}</p>
        <div className={styles.links}>
          {info.basicInfo?.detail?.email && (
            <a className={styles.link} href={`mailto:${info.basicInfo?.detail?.email}`}>
              <AtSign /> {info.basicInfo?.detail?.email}
            </a>
          )}
          {info.basicInfo?.detail?.phone && (
            <a className={styles.link} href={`tel:${info.basicInfo?.detail?.phone}`}>
              <Phone /> {info.basicInfo?.detail?.phone}
            </a>
          )}
          {info.basicInfo?.detail?.linkedin && (
            <a className={styles.link} href={info.basicInfo?.detail?.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin /> {info.basicInfo?.detail?.linkedin}
            </a>
          )}
          {info.basicInfo?.detail?.github && (
            <a className={styles.link} href={info.basicInfo?.detail?.github} target="_blank" rel="noopener noreferrer">
              <GitHub /> {info.basicInfo?.detail?.github}
            </a>
          )}
          {info.basicInfo?.detail?.location && (
            <p className={styles.link}>
              <MapPin /> {info.basicInfo?.detail?.location}
            </p>
          )}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.col1}>{columns[0]}</div>
        <div className={styles.col2}>{columns[1]}</div>
      </div>
    </div>
  );
});

export default Resume;
