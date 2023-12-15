![banner](https://raw.githubusercontent.com/potenday-project/tenplestay/main/frontend/public/dummy/notion-banner.jpg)

# TENPLE STAY

> Get all notifications what you want by "Tenplestay" [ Notification Web Scrapper SaaS ] <br/>
> with [비사이드 - 포텐데이](https://bside.best/potenday)

## 1. Getting started

### 1) backend

1. poetry 세팅 필요 - [how to setup poetry?](https://velog.io/@qlgks1/python-poetry-%EC%84%A4%EC%B9%98%EB%B6%80%ED%84%B0-project-initializing-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0)
2. check out the `pyproject.toml` and `.python-version`
3. run `poetry install`
4. `cp /backend/.env-sample /backend/.env` for set up the environment variable
5. go migration, `python manage.py migrate`
6. run `python manage.py run`

### 2) frontend

- vite 사용

1. `npm install`
2. `cp /frontend/.env-sample /frontend/.env` for set up the environment variable
3. `npm run dev`
4. `npm run build`
