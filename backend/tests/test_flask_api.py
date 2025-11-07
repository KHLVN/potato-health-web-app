import requests

def test_predict_endpoint():
    """✅ Test if /predict returns valid response"""
    file = {'file': open('backend/uploads/1761551509415-Healthy Potato Aug (39).jpg', 'rb')}
    response = requests.post("http://127.0.0.1:2000/predict", files=file)
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert "confidence" in data


def test_no_file_uploaded():
    """🚫 Test if API handles missing file correctly"""
    response = requests.post("http://127.0.0.1:2000/predict")
    assert response.status_code == 400
    assert "error" in response.json()

def test_invalid_file_type():
    """🧩 Test if non-image file returns error"""
    fake = {'file': ('test.txt', b'hello', 'text/plain')}
    response = requests.post("http://127.0.0.1:2000/predict", files=fake)
    assert response.status_code == 500 or response.status_code == 400

def test_confidence_range():
    """🎯 Test if confidence is between 0 and 1"""
    file = {'file': open('backend/uploads/1761551509415-Healthy Potato Aug (39).jpg', 'rb')}
    response = requests.post("http://127.0.0.1:2000/predict", files=file)
    data = response.json()
    assert 0.0 <= data["confidence"] <= 1.0

def test_invalid_route():
    """🚫 Test if non-existent route returns 404"""
    response = requests.get("http://127.0.0.1:2000/wrongroute")
    assert response.status_code == 404

def test_server_alive():
    """🟢 Test if Flask server is running"""
    response = requests.get("http://127.0.0.1:2000")
    assert response.status_code in [200, 404]  # either default route or no route

