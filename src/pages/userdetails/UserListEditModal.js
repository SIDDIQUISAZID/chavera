
const UserListEditModal = () => {
  return (
    <div>
          <Modal
        show={logoutModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="logoutModal"
          className="flex flex-col justify-center p-1 text-center md:p-2"
        >
          <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />

          <div className="mb-2 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black  ">
            <p>Are you sure?</p>
          </div>
          {/* <h1 className='text-4xl font-argent font-medium text-blue-dark'>Are you sure?</h1> */}
          <p className="mb-4 mt-4 w-96 text-xs font-normal">
            {`Do you really want to ${
              isDelete ? "delete" : "deactivate"
            } these record?
             This process cannot be undone.`}
          </p>
          <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md bg-white p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button>
            {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
            <button
              title="Decline"
              onClick={handleDelete}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Yes
            </button>
            {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserListEditModal