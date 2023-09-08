# Scalar APP

## Technologies Used:
- Backend: Python with Django
- Frontend: React with NextJs 13 & TypeScript
- Database: PostgreSQL and MongoDB
- Containerization: Docker
- Real-time Communication: Socket.io
- Version Control: GitHub
- Deployment: Own VPS

## How to start the APP

### Start the Backend (the database starts automatically)

To get started, run the Backend service using Docker Compose:

```bash
docker-compose up backend
```
Wait for the database installation and configuration to complete.

### Configure the Backend

Open another terminal and execute the following command to access the Backend container:

```bash
docker exec -it scalar_backend sh
```

Inside the container, run the following Django commands in order:

```bash
$ python manage.py collectstatic
$ python manage.py migrate
$ python manage.py loaddata init_db.json

# Once you have executed these commands, you can exit the container:

$ exit
```

### Restart the Container

In the original terminal where you started the Backend (CTRL + C to stop it), restart the container and wait for the downloads to complete:

```bash
docker-compose up
```
  
# The app is now running!

## Users:

3 roles for users:

### 'user':
Can leave reviews as part of audience.  

- email: user@gmail.com  
- password: Test-123

### 'critic':
Can leave reviews and influence the rating as a critic specialist.

- email: critic@gmail.com  
- password: Test-123

### 'admin':
Can leave reviews as part of audience.  
Can manage users.  
Can manage movies.

- email: admin@gmail.com  
- password: Test-123