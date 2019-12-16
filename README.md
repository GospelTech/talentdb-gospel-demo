# Talentdb
For context watch [my first video](https://storage.googleapis.com/talentdb-gospel-demo/Gospel%20Devrel%20Video1%20-%20GCP%20Marketplace%2CGDQ%20and%20Demo.mp4). Using gospel.tech's marketplace installer and this repo you can build a private data sharing app with data-owner control and contextual access. There is a front-end component written in React using the React-boilerplate project and a backend that takes care of logins, certificates, the right to be forgotten and sharing data across company boundaries. The React code is just a viewer for the state stored and managed in gospel. 

It's special because A.) You can share data with fine grained access-control as structured data, a graph of relationships or blobs(e.g. PDF, photos) without needing to copy it between orgs; b.) You get immutable read-receipts, detail of which person or account read a row or column of a table, or accessed a file. Any attempt to view or read leaves a trace n 3 Hyperledger Fabric blockchain peers - This means you can verify after trusting data into a shared state and control it/stop sharing. It's the basis of controlling your private information, while allowing it to be used to serve you.

# Video Tutorial
* Watch me build this app from this guide [in video 2](https://storage.googleapis.com/talentdb-gospel-demo/Gospel%20Devrel%20Video2%20-%20Building%20your%20own%20talentdb.mp4)

# Prerequisites
* 1 hour 
* Google Cloud account
* Your own domain and rights to add DNS records (You can try using IPs but chrome gets unhappy and everything fails)

# Build a Gospel backend
* Go to https://console.cloud.google.com/
* Build a Kubernetes/GKE cluster with at least 3 x n1-standard-2 nodes [5 minutes]
* Find Gospel Technology on the Google Cloud Marketplace and install on GKE cluster [3 minutes]
* The marketplace installs an installer - find it and run in via Services [10 minutes]
* COPY/PASTE the usernames and passwords shows - you'll need it later
* Log into your new Gospel Data Platform demo in GKE
* You now have a Gospel Developer Quickstart demo "backend"

# Frontend
* Make a virtual machine
* Add it's IP to DNS
* curl icanhazip.com (this gets you the IP you are using in case you only see your private IP from insude the VM)
* As root (sudo su -) # apt update && apt -y upgrade && apt install -y dnsutils certbot
* Sort out an cert with "certbot certonly"

# Installing NodeJS and NPM:

For production you should make this a docker image, but for dev purposes it's nice to edit, save, run without any additional overhead. I'm using Ubuntu 18.04 so followed [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04). Once you have the latest versions of node and npm, move on
*  apt install -y nodejs npm nginx git vim tmux
* (This only gets you node v8.10.0 and npm 3.5.2 from Ubuntu so follow the tut above to get to Node v10.17.0 and npm 6.11.3
*  curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
*  bash nodesource_setup.sh
*  apt install -y nodejs

Grab the code & set it up

* git clone _this repo_
* cd _this repo_
* npm install gospel-sdk-js-1.5.0-296.tgz

You'll find the Gospel SDK is already there but for a newer version check the Downloads section of the Gospel Admin UI

Configure the app
* edit app/config.js (to add your app's name and review the tables in play)
* npm install
* npm run build
* Now copy the build directory to /var/www/app
* See the nginx config files to implement the reverse_proxy setup to host the app and send traffic to the back end
* Make the site live doing "ln -s /etc/nginx/sites-available/talentdb /etc/nginx/sites-enabled/talentdb"

# Next steps include
* In GKE, find and edit the 'gospel-ca' deployment
* Change all the IP addresses that refer to gospel back-end's nginx web-service with the domain name of font-end. I built talentdb.gus.io with a valid letsencrypt certificate else Chrome was unhappy. Consider doing the same. Using the VM + it's IP + DNS pointed to it was the simplest to get the cert.
* While the gospel-ca deployment works on waking up a new gospel-ca pod with 6 containers (it may take a while) do:
*   use "kubectl -n gospel delete pod/xxxxx" to delete the pods signer-xxxxx and 3x backend-xxxx. 


# Hit it!
* Hitting my talentdb.gus.io for me, shows the index.html file of the build directory on the VM. It also proxy-passes me to the Gospel back-end for login and auth, and the CA changes means it's sends me back to the front-end to continue using the app. 
* Forgive me but my site is likely offline now as I kill the backend and vms when not testing/demoing this to people to save cost....
* Use the accounts provided when the back-end completed. Start with account viewer1

Right! 
Now you can start playing around and see what is connected to what. Try changing the app into a system for sensitive scanned documents for the NHS or a Bank.

Let me know if you need any help!
