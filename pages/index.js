import Head from "next/head";
import { useEffect } from "react";
import Row from "../components/row";
import styles from "../styles/Home.module.css";

export default function Home() {
	// コピーライトの年関係の処理
	useEffect(() => {
		const CREATE_YEAR = 2024;
		const currentYear = new Date().getFullYear();
		const displayYear =
			currentYear > CREATE_YEAR
				? `${CREATE_YEAR}-${currentYear}`
				: CREATE_YEAR.toString();
		document.getElementById("year").textContent = displayYear;
	}, []);

	function searchProduct(e) {
		e.preventDefault();

		const isAkiba = document.getElementById("location-akiba").checked;

		const targets = document.getElementsByClassName("checkTarget");
		for (let index = 0; index < targets.length; index++) {
			const productCode = document.getElementById(
				`product-code-${index}`,
			).value;
			if (
				productCode === "" ||
				productCode === undefined ||
				productCode.length !== 7 // ex: g112236
			) {
				continue;
			}

			fetch(
				`/api/proxy?url=https://akizukidenshi.com/catalog/g/${productCode}/`,
			)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.text();
				})
				.then((data) => {
					const parser = new DOMParser();
					const parsed = parser.parseFromString(data, "text/html");
					const results = parsed.documentElement
						.getElementsByClassName("block-goods-detail-store-stock-tbl")[0]
						.getElementsByTagName("tbody")[0]
						.getElementsByTagName("tr")
						[isAkiba ? 0 : 1].getElementsByTagName("td");
					const stock = Number.parseInt(results[1].textContent.trim());
					const place = results[2].textContent.trim();

					const stockElement = document.getElementById(`stock-${index}`);
					stockElement.textContent = stock;
					stockElement.onchange();

					document.getElementById(`name-${index}`).textContent =
						parsed.documentElement.getElementsByClassName(
							"js-enhanced-ecommerce-goods-name",
						)[0].textContent;

					const productImg = parsed.documentElement
						.getElementsByClassName("block-src-l")[0]
						.getElementsByTagName("img")[0].dataset.src;
					document.getElementById(`product-image-${index}`).src =
						`https://akizukidenshi.com${productImg}`;

					document.getElementById(`location-${index}`).textContent = place;
				})
				.catch((error) => {
					console.error("There was a problem with the fetch operation:", error);
				});
		}
	}

	function printPage() {
		window.print();
		return false;
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Akizuki Place</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className={styles.title}>
					秋月電子の部品の場所を教えてくれるサイトです
				</h1>
				<section>
					<div className="input-group">
						<table className={styles.table}>
							<thead>
								<tr>
									<th className={styles.cell}>商品コード</th>
									<th className={styles.cell}>必要な数</th>
									<th className={styles.cell}>購入可否</th>
									<th className={styles.cell}>在庫</th>
									<th className={styles.cell}>商品名</th>
									<th className={styles.cell}>画像</th>
									<th className={styles.cell}>場所</th>
								</tr>
							</thead>
							<tbody>
								<Row index="0" />
								<Row index="1" />
								<Row index="2" />
								<Row index="3" />
								<Row index="4" />
								<Row index="5" />
								<Row index="6" />
								<Row index="7" />
								<Row index="8" />
								<Row index="9" />
							</tbody>
						</table>
					</div>

					<div>
						<label>
							<input
								type="radio"
								name="location"
								value="akiba"
								id="location-akiba"
								checked
							/>
							秋葉原
						</label>
						<label>
							<input
								type="radio"
								name="location"
								value="yashio"
								id="location-yashio"
							/>{" "}
							八潮
						</label>
					</div>

					<button
						type="button"
						onClick={searchProduct}
						className={`${styles.searchButton} ${styles.button}`}
					>
						検索
					</button>
					<button
						type="button"
						onClick={printPage}
						className={`${styles.printButton} ${styles.button}`}
					>
						印刷する
					</button>
				</section>
			</main>

			<footer>
				<p>
					&copy; <span id="year" /> Ruchi12377. All rights reserved.
				</p>
			</footer>

			<style jsx global>{`
  html,
  body {
  padding: 0;
  margin: 0;
  font-family:
  -apple-system,
  BlinkMacSystemFont,
  Segoe UI,
  Roboto,
  Oxygen,
  Ubuntu,
  Cantarell,
  Fira Sans,
  Droid Sans,
  Helvetica Neue,
  sans-serif;
  }
  * {
  box-sizing: border-box;
  }
  `}</style>
		</div>
	);
}
