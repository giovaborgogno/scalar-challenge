FROM python:3.9-slim-bookworm

ENV PYTHONUNBUFFERED 1
WORKDIR /app

RUN apt-get update && \
    apt-get install -y libpq-dev gcc

COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . /app

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]