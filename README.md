# DISH Test Suite Frontend Repo

## Pre-Requisite

- On-Premises requirement
  | Configuration | Requirement |
  | ------------ | ------------ |
  | Framework | Docker |
  | Programming Language | React |
  | Web Server | Apache |
  | RAM | 8 GB |
  | Storage | 100 GB SSD |
  | CPU | Quad-core, 2.5 GHz |

- Cloud System/ k8s deployment requirements (AWS Example)
  | Configuration | Requirement |
  | ------------ | ------------ |
  | Framework | Docker |
  | Programming Language | React |
  | Web Server | t3.medium |
  | RAM | 4 GB |
  | Storage | 50 GB SSD |

## Steps to deploy

Execute below commands

```
docker build -t frontend .
docker run -d -p 3000:3000 frontend
```

*Validate if docker is running*
`docker ps`
