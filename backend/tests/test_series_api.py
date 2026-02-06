from bson import ObjectId


def test_post_series_creates_series(client):
    payload = {"title": "Serie prueba", "numbers": [12, 15, 21, 30]}
    res = client.post("/series", json=payload)

    assert res.status_code == 201
    body = res.json()

    assert "id" in body
    assert body["title"] == "Serie prueba"
    assert body["numbers"] == [12, 15, 21, 30]
    assert isinstance(body["id"], str)
    assert len(body["id"]) > 0


def test_get_series_lists_series(client):
    client.post("/series", json={"title": "S1", "numbers": [1, 2, 3]})
    client.post("/series", json={"title": "S2", "numbers": [10, 20]})

    res = client.get("/series")
    assert res.status_code == 200

    items = res.json()
    assert isinstance(items, list)
    assert len(items) == 2

    titles = {x["title"] for x in items}
    assert titles == {"S1", "S2"}


def test_analyze_series_returns_metrics(client):
    create = client.post("/series", json={"title": "Serie", "numbers": [12, 15, 21, 30]})
    series_id = create.json()["id"]

    res = client.get(f"/series/{series_id}/analyze")
    assert res.status_code == 200

    body = res.json()
    assert body["id"] == series_id
    assert body["numbers"] == [12, 15, 21, 30]
    assert body["gcd_all"] == 3
    assert body["mean"] == 19.5
    # std_dev poblacional: sqrt(47.25) = 6.8738635...
    assert abs(body["std_dev"] - 6.873864) < 1e-6
    assert body["primes"] == []


def test_analyze_invalid_id_format_returns_400(client):
    res = client.get("/series/invalid-id/analyze")
    assert res.status_code == 400

    body = res.json()
    assert body["error"]["type"] == "http_error"
    assert body["error"]["message"] == "invalid id format"


def test_analyze_nonexistent_id_returns_404(client):
    fake_id = str(ObjectId())
    res = client.get(f"/series/{fake_id}/analyze")
    assert res.status_code == 404

    body = res.json()
    assert body["error"]["type"] == "http_error"
    assert body["error"]["message"] == "series not found"


def test_post_series_blank_title_returns_400(client):
    res = client.post("/series", json={"title": "   ", "numbers": [1, 2, 3]})
    assert res.status_code == 400

    body = res.json()
    assert body["error"]["type"] == "http_error"
    assert body["error"]["message"] == "title cannot be blank"


def test_post_series_empty_numbers_returns_422(client):
    # Pydantic Field(min_length=1) dispara validation error (422)
    res = client.post("/series", json={"title": "S", "numbers": []})
    assert res.status_code == 422

    body = res.json()
    assert body["error"]["type"] == "validation_error"
    assert body["error"]["message"] == "Invalid request payload"
    assert "details" in body["error"]
