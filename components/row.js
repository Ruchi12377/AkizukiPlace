import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";

const Row = ({ index }) => {
	useEffect(() => {
		const need = document.getElementById(`need-${index}`);
		const stock = document.getElementById(`stock-${index}`);
		const enough = document.getElementById(`enough-${index}`);

		need.onchange = () => onChangeValue();
		stock.onchange = () => onChangeValue();

		function onChangeValue() {
			const stockCount = Number.parseInt(stock.textContent);
			if (Number.isNaN(stockCount) === false) {
				enough.textContent = need.value <= stockCount ? "✅" : "❌";
			}
		}
	}, [index]);

	return (
		<tr className="checkTarget">
			<td className={styles.cell}>
				<input
					type="text"
					id={`product-code-${index}`}
					placeholder="商品コード"
				/>
			</td>
			<td className={styles.cell}>
				<input
					type="number"
					id={`need-${index}`}
					placeholder="必要な数"
					min="0"
					defaultValue="1"
				/>
			</td>
			<td className={styles.cell}>
				<p id={`enough-${index}`}>-</p>
			</td>
			<td className={styles.cell}>
				<p id={`stock-${index}`}>-</p>
			</td>
			<td className={styles.cell}>
				<p id={`name-${index}`}>-</p>
			</td>
			<td className={styles.cell}>
				<img
					id={`product-image-${index}`}
					src=""
					alt="商品画像"
					style={{ maxWidth: "120px" }}
				/>
			</td>
			<td className={styles.cell}>
				<p id={`location-${index}`}>-</p>
			</td>
		</tr>
	);
};

export default Row;
