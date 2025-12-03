# gunicorn_config.py

# --- Worker Configuration ---

# The number of worker processes. A common recommendation is (2 * $num_cores) + 1.
# Start low (3-5) and adjust based on CPU load and traffic.
workers = 3 
threads = 1 # Recommended to keep at 1 for Gunicorn, threads are handled by the workers.

# The maximum number of requests a worker will process before restarting.
# This prevents memory leaks from long-running processes.
max_requests = 1000
max_requests_jitter = 50 # Add some randomness to prevent all workers restarting at once.

# --- Socket Binding Configuration ---

# Gunicorn should bind to a Unix socket, not a TCP port, 
# for secure and fast communication with Nginx.
bind = 'unix:/tmp/[APP_NAME].sock'

# The timeout in seconds for silent workers. Adjust as needed for long-running requests.
timeout = 30 

# --- Logging Configuration ---

# Access log file (where HTTP request logs go)
accesslog = '/var/log/gunicorn/[APP_NAME]_access.log'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Error log file (where Gunicorn startup/shutdown and internal errors go)
errorlog = '/var/log/gunicorn/[APP_NAME]_error.log'
# Log level: 'debug', 'info', 'warning', 'error', 'critical'
loglevel = 'info' 

# Set the process name (optional, but useful for monitoring)
proc_name = '[APP_NAME]_gunicorn'
