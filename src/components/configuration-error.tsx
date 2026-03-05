/**
 * Configuration Error Component
 * Displays user-friendly error messages when environment variables are missing
 */

interface ConfigurationErrorProps {
  missingVars: string[];
  showInstructions?: boolean;
}

export function ConfigurationError({ 
  missingVars, 
  showInstructions = true 
}: ConfigurationErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg 
              className="h-12 w-12 text-yellow-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Missing Supabase Configuration
            </h1>
            
            <p className="text-gray-700 mb-4">
              The following environment variables are required but not set:
            </p>
            
            <ul className="list-disc list-inside mb-6 space-y-1">
              {missingVars.map((varName) => (
                <li key={varName} className="text-gray-800 font-mono text-sm">
                  {varName}
                </li>
              ))}
            </ul>
            
            {showInstructions && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="font-semibold text-blue-900 mb-2">
                  To fix this:
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                  <li>Copy <code className="bg-blue-100 px-1 rounded">.env.example</code> to <code className="bg-blue-100 px-1 rounded">.env.local</code></li>
                  <li>
                    Add your Supabase credentials from{' '}
                    <a 
                      href="https://supabase.com/dashboard" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-600"
                    >
                      https://supabase.com/dashboard
                    </a>
                  </li>
                  <li>Restart the development server</li>
                </ol>
                
                <p className="mt-4 text-sm text-blue-700">
                  For more information, see the <code className="bg-blue-100 px-1 rounded">README.md</code> file.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
