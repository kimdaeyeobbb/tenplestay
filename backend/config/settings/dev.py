from .base import *  # noqa: F403, F401


DEBUG = True

# local에서 dev 돌리려면 DBMS에서 ssh 터널링해야함
# 아래는 ssh 터널링 고려안하고 세팅된 값
DATABASES = {"default": env.db("DBMS_URL_DEV")}
