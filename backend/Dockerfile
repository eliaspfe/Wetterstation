FROM python:3.12-slim

# RUN apt-get update && apt-get install -y \
#     build-essential \
#     gcc \
#     libgl1 \
#     libglib2.0-0 \
#     libsm6 \
#     libxext6 \
#     libxrender1 \
#     libxcb1 \
#     poppler-utils \
#     && rm -rf /var/lib/apt/lists/*
COPY backend.py .
COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 8000

CMD [ "python", "backend.py" ]