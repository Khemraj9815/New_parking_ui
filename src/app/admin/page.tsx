"use client"
import ProtectedRoute from '../../components/protected/page';


const AdminPage = () => {
    return (
      <ProtectedRoute allowedRoles={['Admin']}>
        <div>
          <h1>Admin Page</h1>
          <p>This content is accessible only to admin users.</p>
        </div>
      </ProtectedRoute>
    );
  };
  
  export default AdminPage;
