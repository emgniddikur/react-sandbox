import { AspectRatio } from "@/components/AspectRatio";
import { DesignFileIcon } from "../DesignFileIcon";
import styles from "./styles.module.scss";

type Props = {
  thumbnail: string;
  title: string;
  description: string;
};

export const Card: React.VFC<Props> = (props) => {
  return (
    <div className={styles.base}>
      <AspectRatio ratio={119 / 200}>
        <img src={props.thumbnail} />
      </AspectRatio>
      <div className={styles.metaContainer}>
        <DesignFileIcon />
        <div className={styles.textContainer}>
          {/* TODO: Typography */}
          <p>{props.title}</p>
          {/* TODO: Typography */}
          <span>{props.description}</span>
        </div>
      </div>
    </div>
  );
};
