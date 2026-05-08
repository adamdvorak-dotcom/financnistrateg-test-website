#!/usr/bin/env python3
"""Simple static server for index-v2.html at http://localhost:4000"""
import http.server, socketserver, os, urllib.parse

PORT = 4000
ROOT = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = urllib.parse.unquote(path.split('?')[0])
        if path == '/':
            path = '/index-v2.html'
        return os.path.join(ROOT, path.lstrip('/'))

    def log_message(self, fmt, *args):
        print(fmt % args)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    httpd.serve_forever()
