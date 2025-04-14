async function simulatedelay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addafterdelay(a, b, ms){
    await simulatedelay(ms);
    const sum = a + b;
    console.log(`result after ${ms}ms: ${sum}`);
}

addafterdelay(3, 7, 2000);
