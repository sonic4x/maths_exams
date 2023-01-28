

# How to start #
1. Run backend
```
cd backend
source .venv/bin/activate
python backend.py -e 10.0.0.25
```
2. Run frontend

- vue verstion  (ios not supported)


```
cd frontend
Edit `frontend/src/components/global_v.js` make the host ip see fit

npm install
npm run dev
```

- react version (all browser supported)


```
cd frontend_react
Edit `global_v.js` make the host ip see fit

npm install
npm start
```

# combine backend and frontend
take frontend_react as example:
```
cd frontend_react
# Edit `global_v.js` make the request address to be empty. Like: api_server:""

npm run build             # generate "build" folder

mv build/static/* build/  # modify content in build folder, move "static" subfolder content to parent folder

ln -s build/ ../backend/static  # create soft link, adding the resource from frontend "build" to backend "static"

# Run
cd backend
source .venv/bin/activate
python backend.py  # (use localhost:5000 to visit)
or python backend.py -e ip # (use ip:5000 to visit)
```

# Deploy #
- Deploy combined backend and frontend to deta:
    ```
    # refer to `combine backend and frontend` step to build frontend static resources.
    # use copy rather than soft link to copy the build resources to backend folder.

    # Now use deta, follow the guide: 
    https://docs.deta.sh/docs/micros/getting_started
    ```
    ```
    # Some useful deta cli command.
    deta login
    deta new --python maths-app
    deta deploy

    deta visor open  # open browser to view the log, manage your micro
    ```

    **Entry point :**  https://maths.deta.dev/

- React auto deployed via github action and github pages:

    **Entry point :** https://sonic4x.github.io/maths_exams/

    (https://maths.deta.dev/ as API server in this case)
