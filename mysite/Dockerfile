FROM python:3.9.0 as builder

WORKDIR /backend

COPY Pipfile Pipfile.lock ./

RUN apt-get update && \
  apt-get install -y --no-install-recommends gcc python3-dev libssl-dev

RUN pip install pipenv
RUN pipenv install --deploy --system

FROM python:3.9.0-slim
ENV PYTHONUNBUFFERED 1

ENV DJANGO_DEBUG False

WORKDIR /backend

EXPOSE $PORT

RUN apt-get update && \
  apt-get install -y libpq-dev

COPY --from=builder /usr/local/lib/python3.9 /usr/local/lib/python3.9
COPY --from=builder /usr/local/bin/gunicorn /usr/local/bin/gunicorn
COPY . .

# RUN python manage.py makemigrations
# RUN python manage.py migrate

CMD gunicorn mysite.wsgi --bind 0.0.0.0:$PORT
