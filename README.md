#maths_exams

# How to start #
Step 1. Run backend
```
cd backend
source .venv/bin/activate
python backend.py -e 10.0.0.25

Step 2. Run frontend 
2.a vue verstion  (ios not supported)
Edit `frontend/src/components/global_v.js` make the host ip see fit
```
npm install
npm run dev
```

2.b react version (all browser supported)

Edit `global_v.js` make the host ip see fit
```
cd frontend_react
npm install
npm start
```
