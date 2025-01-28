# app.py (Backend)
from flask import Flask, jsonify
from flask_cors import CORS
import threading
from your_bot_module import DexScreenerBot

app = Flask(__name__)
CORS(app)
bot = None

@app.route('/api/status')
def get_status():
    return jsonify({
        'active': bot.is_running,
        'portfolio': bot.get_portfolio(),
        'alerts': bot.get_recent_alerts(),
        'performance': bot.get_performance_stats()
    })

@app.route('/api/trade', methods=['POST'])
def execute_trade():
    # Add trade execution logic
    return jsonify({'status': 'success'})

def run_bot():
    global bot
    bot = DexScreenerBot(config)
    bot.start()

if __name__ == '__main__':
    threading.Thread(target=run_bot).start()
    app.run(port=5000)
