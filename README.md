#maths_exams

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
npm run build             # generate "build" folder
mv build/static/* build/  # modify content in build folder, move "static" subfolder content to parent folder
ln -s build/ ../backend/static  # create soft link, adding the resource from frontend "build" to backend "static"

# Run
cd backend
source .venv/bin/activate
python backend.py
```

# Deploy #
deploy via deta:
cd frontend_react
npm run build  generate "build" folder
mv build/static/* build/
cp build/* backend/static

deta login
deta new --python maths-app
..

// view 
deta visor open  // open browser to view the log, manage your micro

enjoy: https://maths.deta.dev/

