import axios from 'axios';

let currentEndTime = new Date();
const batchInterval = 60 * 60 * 1000;
const pollingInterval = 3 * 60 * 1000; 

const processBatch = async () => {
  const currentStartTime = new Date(currentEndTime.getTime() - batchInterval);

  try {
    console.log('inside try');
    await axios.post('http://localhost:4100/batch', {
      startTime: currentStartTime.toISOString(),
      endTime: currentEndTime.toISOString(),
    });

    console.log(`Processed batch from ${currentStartTime} to ${currentEndTime}`);

    currentEndTime = currentStartTime;
  } catch (error) {
    console.error('Batch processing error:', error);
  }
};

export const startBatchPolling = () => {
    processBatch();

    setInterval(processBatch, pollingInterval);
};
