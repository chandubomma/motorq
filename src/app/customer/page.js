import EnrollmentForm from "@/components/EnrollmentForm"

const page = () => {
    const makeOptions=[
        { id: 'M1', name: 'BMW' },
        { id: 'M2', name: 'Ford' },
    ];
    const modelOptions=[
        { id: 'O1', makeId: 'M1', name: 'X5' },
        { id: 'O2', makeId: 'M1', name: '3 Series' },
        { id: 'O3', makeId: 'M2', name: 'Mustang' },
        { id: 'O4', makeId: 'M2', name: 'Focus' },
    ];
    const yearOptions=[
        { id: '1', makeId: 'M1', modelId: 'O1', year: '2022' },
        { id: '2', makeId: 'M1', modelId: 'O1', year: '2021' },
        { id: '3', makeId: 'M1', modelId: 'O2', year: '2022' },
        { id: '4', makeId: 'M2', modelId: 'O3', year: '2022' },
        { id: '5', makeId: 'M2', modelId: 'O4', year: '2021' },
    ];
  return (
    <div>
      <div className="w-full">
        <EnrollmentForm modelOptions={modelOptions} makeOptions={makeOptions} yearOptions={yearOptions}/>
      </div>
    </div>
  )
}

export default page
