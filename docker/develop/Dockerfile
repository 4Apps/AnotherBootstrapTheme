# ---------------------------------------------------------------------------
# Install base
# ---------------------------------------------------------------------------
FROM debian:stable
MAINTAINER gm@gm.lv

# Avoid interactive cli blockers
ENV DEBIAN_FRONTEND noninteractive

# OS dependecies
RUN apt-get update -yq \
    && apt-get install -yq apt-utils

RUN apt-get install -yq apt-transport-https lsb-release ca-certificates \
        nano wget curl unzip git rsync gettext-base supervisor build-essential


# ---------------------------------------------------------------------------
# Install node.js and npm
# ---------------------------------------------------------------------------
RUN wget -O - https://deb.nodesource.com/setup_16.x | bash \
    && apt-get install nodejs -yq \
    && wget -O /usr/lib/ssl/cert.pem https://curl.haxx.se/ca/cacert.pem \
    && npm install -g npm@latest


# ---------------------------------------------------------------------------
# Copy files, Install dependecies
# ---------------------------------------------------------------------------
WORKDIR /srv/sites/cache

# Cache scripts and dependecies first
COPY . /root/docker/develop/
RUN cp /root/docker/develop/data/* ./

# NPM
RUN npm install \
   && npm cache clean --force

# ---------------------------------------------------------------------------
# Run dev
# ---------------------------------------------------------------------------
WORKDIR /srv/sites/web

RUN envsubst < /root/docker/develop/conf/supervisord.services.conf > /etc/supervisor/conf.d/services.conf

CMD ["/root/docker/develop/scripts/run.bash"]

EXPOSE 8080
