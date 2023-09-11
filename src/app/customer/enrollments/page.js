import EnrollmentsPage from "@/components/EnrollmentsPage"

const page = async() => {
    const enrollmentRequestData = await fetchEnrolls();

  return (
    <div>
      <EnrollmentsPage enrollmentRequestData={enrollmentRequestData}/>
    </div>
  )
}

export default page


async function fetchEnrolls() {
    try {
      const response = await fetch(`http://localhost:3000/api/getenrollments`,{method : 'GET',headers: {
        'Content-Type': 'application/json',
      }}); // Replace '/api/mmys' with the actual API route to fetch MMY data
      if (!response.ok) {
        throw new Error('Error fetching MMY data');
      }
  
      const data = await response.json();
      console.log(data.data)
      return data.data; // Assuming the response is an array of MMY objects
    } catch (error) {
      console.error('Error fetching enroll data:', error);
      throw error; // You can handle this error in the calling function
    }
  }
