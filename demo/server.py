from flask import Flask, request, send_from_directory

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='/')

@app.route('/<path:path>')
def send(path):
    print(path)
    return send_from_directory('public', path)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3005, debug=True, ssl_context='adhoc')
