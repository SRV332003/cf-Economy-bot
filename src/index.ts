import app from '@/routes/index';
import { config } from '@config/index';
import dbConnect from '@/db/dbConnect';

app.onStart(() => {
    if (config.env.NODE_ENV === 'devlopment') {
        fetch('http://localhost:3001/restart');
        console.log('🦊 Triggering Live Reload');
    }
})
    .onStart(() => {
        config.healthCheck();
        // dbConnect()
    })
    .listen(3000, () => console.log('STARTED: 3000'));
/**
 * 
app.onStart(() => {
    if (config.env.NODE_ENV === 'devlopment') {
        fetch('http://localhost:3001/restart');
        console.log('🦊 Triggering Live Reload');
    }
})
    .onStart(() => {
        config.healthCheck();
    })
    .listen(3000, () => console.log('STARTED: 3000'));
 *
 * */
