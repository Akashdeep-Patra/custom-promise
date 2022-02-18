const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;
//ES%
const CustomPromise = function (executor) {
  let state = PENDING;
  let value = null;
  let handlers = [];
  //ideally theres only one cather
  let catchers = [];

  function resolve(result) {
    if (state !== PENDING) {
      return;
    }
    state = FULFILLED;
    value = result;
    handlers.forEach((handler) => {
      handler(value);
    });
  }

  function reject(error) {
    if (state !== PENDING) {
      return;
    }
    state = REJECTED;
    value = error;
    //ideally theres only one cather
    catchers.forEach((catcher) => {
      catcher(value);
    });
  }

  this.then = function (successCallback) {
    if (state === FULFILLED) {
      successCallback(value);
    } else {
      handlers.push(successCallback);
    }
    return this;
  };

  this.catch = function (failureCallback) {
    if (state === REJECTED) {
      failureCallback(value);
    } else {
      catchers.push(failureCallback);
    }
    return this;
  };

  executor(resolve, reject);
};
//ES6
class CustomPromiseClass {
  state = PENDING;
  value = null;
  handlers = [];
  //ideally theres only one cather
  catchers = [];

  constructor(executor) {
    const resolve = (result) => {
      if (this.state !== PENDING) {
        return;
      }
      this.state = FULFILLED;
      this.value = result;
      this.handlers.forEach((handler) => {
        handler(this.value);
      });
    };

    const reject = (error) => {
      if (this.state !== PENDING) {
        return;
      }
      this.state = REJECTED;
      this.value = error;
      //ideally theres only one cather
      this.catchers.forEach((catcher) => {
        catcher(this.value);
      });
    };
    executor(resolve, reject);
  }

  then(successCallback) {
    if (this.state === FULFILLED) {
      successCallback(this.value);
    } else {
      this.handlers.push(successCallback);
    }
    return this;
  }

  catch(failureCallback) {
    if (this.state === REJECTED) {
      failureCallback(this.value);
    } else {
      this.catchers.push(failureCallback);
    }
    return this;
  }
}

//function to wait for some time
function wait(ms) {
  return new CustomPromiseClass((resolve, reject) => {
    if (ms < 0) {
      reject(new Error('negative number'));
      return;
    }
    setTimeout(resolve, ms);
  });
}

wait(1000)
  .then(() => {
    console.log('Success!');
  })
  .then(() => {
    console.log('Success!');
  })
  .then(() => {
    console.log('Success!');
  })
  .then(() => {
    console.log('Success!');
  })
  .catch((e) => {
    console.log(e);
  });
