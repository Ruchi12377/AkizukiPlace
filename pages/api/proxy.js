const proxyApi = async (req, res) => {
	const { url } = req.query;
	if (typeof url !== "string") {
		// url が指定されていない場合
		return res.status(400);
	}
	if (req.method !== "GET") {
		// GET 以外のメソッドでアクセスされた場合(GET のみに対応）
		return res.status(405);
	}

	const response = await fetch(url);
	const text = await response.text();
	res.setHeader("Content-Type", "text/html");
	res.status(200).send(text);
};

export default proxyApi;
