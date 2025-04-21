import React from 'react'

function AdminDashboard() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://www.shutterstock.com/image-photo/business-people-portrait-arms-crossed-260nw-2476215783.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">welcome admin</h1>
            <p className="py-6">
              welcome admin to yummy food. here you can manage all the sellers and their products.and also the users and there orders . we hope you have a great experience with us.
            </p>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
