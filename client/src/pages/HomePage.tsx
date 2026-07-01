import QuestionnaireForm from '../components/questionnaire/QuestionnaireForm';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Find Your Perfect Car
        </h1>
        <p className="mt-3 text-gray-600">
          Answer a few simple questions and we&apos;ll recommend the best cars for you.
        </p>
      </div>
      <QuestionnaireForm />
    </div>
  );
}
