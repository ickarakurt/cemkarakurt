---
author: Cem Karakurt
pubDatetime: 2022-05-16T00:00:00Z
modDatetime: 2022-05-16T00:00:00Z
title: "SonarQube Docker Mac Installation in 5 Minutes"
slug: sonarqube-mac-installation-in-5-minutes
featured: false
draft: false
tags:
  - sonarqube
  - docker
  - mac
description:
  Effortlessly install SonarQube on Mac using Docker in just 5 minutes! This
  guide walks you through the process, from container setup to code analysis.
---

**SonarQube** is a perfect tool to **analyze** your code. And, community version is free and open-source. You can install SonarQube to your server or your computer. In this article, I will share how I installed SonarQube to my Mac M1 with Docker.

The first thing you need to do is create a container with a SonarQube image. The below line will pull the image and start SonarQube in port 8084.

    docker run -d -p 8084:9000 mwizner/sonarqube:8.7.1-community

After container creation ended, you can access the SonarQubeUI with 127.0.0.1:8084 address. The default username and password is “admin”.

The next step is clicking the “Add Project” button.

<img src="https://cdn-images-1.medium.com/max/6316/1*f3NAWSM4urdt1WegP9kMmw.png" alt="drawing" width="800"/>

Fill in the required fields.

<img src="https://cdn-images-1.medium.com/max/3840/1*MJHu8OdIMF4dqoyNFBVr2A.png" alt="drawing" width="800"/>

And click the “Set Up” button. Now, you should enter a name for the token.

<img src="https://cdn-images-1.medium.com/max/3840/1*E-UF9c81S9-DOCxsZ7Ogfg.png" alt="drawing" width="800"/>

And, you will see the below page.

<img src="https://cdn-images-1.medium.com/max/3840/1*9YeWAg4Dc4mfgYva7JwRqg.png" alt="drawing" width="800"/>

Now, our project is ready on the SonarQube server and you are seeing the command you need to run to analyze your code. It is time to use SonarQube CLI.

Enter => [https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
link to download sonar scanner CLI.

<img src="https://cdn-images-1.medium.com/max/5360/1*IqUODoJpYez3A7DS_gEYOQ.png" alt="drawing" width="800"/>

After you click the link in the above screenshot, the file will be downloaded automatically.

The last part is running the command to analyze the project. The command generated for my project is

```bash
sonar-scanner \
    -Dsonar.projectKey=key-for-your-project \
    -Dsonar.sources=. \
    -Dsonar.host.url=http://127.0.0.1:8084 \
    -Dsonar.login=bf6878d3e405142f34795165e14e18da1723c85f
```

Now, you should enter the project path via the terminal and run the above command.

But, you will see the below error, because we downloaded the sonar scanner CLI to a different path.

<img src="https://cdn-images-1.medium.com/max/2608/1*sUEAu5MZABtcc_9pyIBDDQ.png" alt="drawing" width="800"/>

So, I just updated the command and used the path I downloaded the sonar scanner. Also, you can define an alias for your terminal. I added an alias to my ”~/.zshrc” file.

    alias sonar-scanner=”~/sonar-scanner/bin/sonar-scanner”

<img src="https://cdn-images-1.medium.com/max/3840/1*brQYMtgvpPCJHuSFbuH57w.png" alt="drawing" width="800"/>

Now, you can go to the dashboard again and check the result of the analyses

<img src="https://cdn-images-1.medium.com/max/3840/1*5dPmRO0KJMuUhkVYDutPsw.png" alt="drawing" width="800"/>

### In Conclusion,

It is really easy to install SonarQube and analyze your code. If you have any questions, please feel free to ask in the comments.
