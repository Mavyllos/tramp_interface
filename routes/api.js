const rp = require('request-promise')

function getResouces(resource) {
  return function (req, res) {
    rp(resource)
      .then(result => {
        let resultArray = JSON.parse(result);
        res.render('indexData', {resultArray})
    })
  }
}

function getFilterID(resource) {
  return function (req, res) {
    let id = req.params.id;
    let request = `${resource}${'/'}${id}`;
    rp(request)
    .then(result => {
      let resultArray = JSON.parse(result);
      res.render('indexData', {
        result: resultArray
      })
    })
  }
}

function getFilterIDOwner(resource) {
  return function (req, res) {
    let id = req.params.id;
    let request = `${resource}${'/'}${id}`;
    rp(request)
    .then(result => {
      let resultArray = JSON.parse(result);
      res.render('editOwner', {
        result: resultArray
      })
    })
  }
}


function getFilterIDWalker(resource) {
  return function (req, res) {
    console.log('in getFilterIDWalker');
    let id = req.params.id;
    let request = `${resource}${'/'}${id}`;
    rp(request)
    .then(result => {
      let resultArray = JSON.parse(result);
      res.render('editWalker', {
        result: resultArray
      })
    })
  }
}


function createResource(resource) {
  return function (req,res) {
    let create = {
      owner_id: req.body.owner_id,
      walker_id: req.body.walker_id,
      name: req.body.name,
      description: req.body.description,
      logo_img: req.body.logo_img,
      url: req.body.url,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip ,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      user_id: req.body.user_id,
      breed: req.body.breed,
      size: req.body.size,
      allergies: req.body.allergies,
      kids: req.body.kids,
      other_dogs: req.body.other_dogs,
      other_people: req.body.other_people,
      fav_treat: req.body.fav_treat,
      bio: req.body.bio,
      image: req.body.image,
    }
    function clean(create) {
      for (let propName in create) {
        if (create[propName] === null || create[propName] === undefined) {
          delete create[propName];
        }
      }
    }
    clean(create)

    let request = {
              method: 'POST',
              uri: resource,
              body: create,
              json: true
            };
    rp(request)
    .then(result => {
      res.render('showDataWalkers', {result})
    })
  }
}

function updateResource(resource) {
  return function (req,res) {
    let id = req.params.id
    let update = {
      owner_id: req.body.owner_id,
      walker_id: req.body.walker_id,
      name: req.body.name,
      description: req.body.description,
      logo_img: req.body.logo_img,
      url: req.body.url,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip ,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      user_id: req.body.user_id,
      breed: req.body.breed,
      size: req.body.size,
      allergies: req.body.allergies,
      kids: req.body.kids,
      other_dogs: req.body.other_dogs,
      other_people: req.body.other_people,
      fav_treat: req.body.fav_treat,
      bio: req.body.bio,
      image: req.body.image,
    }
    function clean(update) {
      for (let propName in update) {
        if (update[propName] === null || update[propName] === undefined) {
          delete update[propName];
        }
      }
    }
    clean(update)

    let request = {
              method: 'PUT',
              uri: `${resource}${'/'}${id}`,
              body: update,
              json: true
            };
    rp(request)
    .then(result => {
      let resultArray = result[0];
      res.render('showDataWalkers', {
        result: resultArray
      })
    })
  }
}

function updateResourceOwner(resource) {
  return function (req,res) {
    let id = req.params.id
    let update = {
      owner_id: req.body.owner_id,
      walker_id: req.body.walker_id,
      name: req.body.name,
      description: req.body.description,
      logo_img: req.body.logo_img,
      url: req.body.url,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip ,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      user_id: req.body.user_id,
      breed: req.body.breed,
      size: req.body.size,
      allergies: req.body.allergies,
      kids: req.body.kids,
      other_dogs: req.body.other_dogs,
      other_people: req.body.other_people,
      fav_treat: req.body.fav_treat,
      bio: req.body.bio,
      image: req.body.image,
    }
    function clean(update) {
      for (let propName in update) {
        if (update[propName] === null || update[propName] === undefined) {
          delete update[propName];
        }
      }
    }
    clean(update)

    let request = {
              method: 'PUT',
              uri: `${resource}${'/'}${id}`,
              body: update,
              json: true
            };
    rp(request)
    .then(result => {
      let resultArray = result[0];
      res.render('showDataOwners', {
        result: resultArray
      })
    })
  }
}


function updateResourceWalker(resource) {
  return function (req,res) {
    let id = req.params.id
    let update = {
      owner_id: req.body.owner_id,
      walker_id: req.body.walker_id,
      name: req.body.name,
      description: req.body.description,
      logo_img: req.body.logo_img,
      url: req.body.url,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip ,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      user_id: req.body.user_id,
      breed: req.body.breed,
      size: req.body.size,
      allergies: req.body.allergies,
      kids: req.body.kids,
      other_dogs: req.body.other_dogs,
      other_people: req.body.other_people,
      fav_treat: req.body.fav_treat,
      bio: req.body.bio,
      image: req.body.image,
    }
    function clean(update) {
      for (let propName in update) {
        if (update[propName] === null || update[propName] === undefined) {
          delete update[propName];
        }
      }
    }
    clean(update)

    let request = {
              method: 'PUT',
              uri: `${resource}${'/'}${id}`,
              body: update,
              json: true
            };
    rp(request)
    .then(result => {
      let resultArray = result[0];
      res.render('showDataWalkers', {
        result: resultArray
      })
    })
  }
}


function deleteResource(resource) {
  return function (req,res) {
    let id = req.params.id

    let request = {
              method: 'DELETE',
              uri: `${resource}${'/'}${id}`,
              json: true
            };
    rp(request)
    .then(result => {
      res.render('indexData', {result})
    })
  }
}



module.exports = {
  getResouces,
  getFilterID,
  getFilterIDOwner,
  getFilterIDWalker,
  createResource,
  updateResource,
  updateResourceOwner,
  updateResourceWalker,
  deleteResource
};
