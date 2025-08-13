import styles from './PointsList.module.css';

interface PointsListProps {
    items: string[];
    bulletColor?: string;
    gap?: string;
}

export const PointsList: React.FC<PointsListProps> = ({ items, bulletColor = '#1890ff', gap = '16px' }) => {
    return (
        <div className={styles.list} style={{ gap }}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <span
                        className={styles.bullet}
                        style={{ color: bulletColor }}
                    >
                        •
                    </span>
                    <span className={styles.text}>{item}</span>
                </div>
            ))}
        </div>
    );
};