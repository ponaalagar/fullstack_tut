from flask import Flask, render_template, request, jsonify
import requests
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/proxy', methods=['POST'])
def proxy_request():
    data = request.json
    try:
        method = data.get('method', 'GET')
        url = data.get('url')
        headers = data.get('headers', {})
        body = data.get('body', None)
        
        # Convert list of headers to dict if necessary, or assume dict
        # Simple implementation expects sending dict from frontend
        
        start_time = time.time()
        
        # Make the request
        if method == 'GET':
            resp = requests.get(url, headers=headers)
        elif method == 'POST':
            resp = requests.post(url, headers=headers, json=body)
        elif method == 'PUT':
            resp = requests.put(url, headers=headers, json=body)
        elif method == 'DELETE':
            resp = requests.delete(url, headers=headers)
        elif method == 'PATCH':
             resp = requests.patch(url, headers=headers, json=body)
        else:
            return jsonify({'error': 'Unsupported method'}), 400
            
        elapsed = (time.time() - start_time) * 1000 # ms
        
        # Try to parse JSON response
        try:
            resp_data = resp.json()
        except:
            resp_data = resp.text
            
        return jsonify({
            'status_code': resp.status_code,
            'headers': dict(resp.headers),
            'body': resp_data,
            'time': f"{elapsed:.2f} ms"
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
