import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: 'What is your name?',
    type: 'text',
    name: 'name',
  },
  {
    question: 'What is your email?',
    type: 'email',
    name: 'email',
  },
  {
    question: 'What is your company name or URL?',
    type: 'text',
    name: 'company',
  },
  {
    question: 'What is your role or title?',
    type: 'text',
    name: 'role',
  },
  {
    question: 'Which best describes your situation?',
    type: 'multiselect',
    name: 'situation',
    options: [
      'High-stakes negotiation requiring strategic leverage',
      'Communication challenges with sophisticated manipulation',
      'Potential threat to reputation or legacy',
      'Need for strategic protection in complex situation',
      'Extraction from toxic situation or arrangement',
      'Other'
    ],
  },
  {
    question: 'What makes this particularly challenging or complex? Please describe the situation as best as possible.',
    type: 'textarea',
    name: 'challenges',
  },
  {
    question: 'What solutions have you already tried?',
    type: 'textarea',
    name: 'solutionsTried',
  },
  {
    question: 'What is your timeline for resolution?',
    type: 'select',
    name: 'timeline',
    options: [
      'Immediate (within days)',
      'Short-term (within weeks)',
      'Medium-term (within months)',
      'Strategic (ongoing situation)'
    ],
  },
  {
    question: 'Which of these outcomes would create the most significant impact?',
    type: 'multiselect',
    name: 'outcomes',
    options: [
      'Maintaining control in high-stakes communications',
      'Seeing manipulation patterns before they take effect',
      'Transforming vulnerabilities into strategic advantages',
      'Designing effective exit strategies while protecting assets',
      'Creating leveraged control over critical situations',
      'Restoring power in situations where it\'s being systematically stripped away'
    ],
  },
  {
    question: 'How did you learn about GenZen Pro?',
    type: 'select',
    name: 'referralSource',
    options: [
      'Web search',
      'Referral',
      'LinkedIn',
      'Free Resource',
      'Other'
    ],
  },
  {
    question: 'Is there anything else you believe would be important for us to know before our conversation?',
    type: 'textarea',
    name: 'additionalInfo',
  },
];

interface GenZenConversationalFormProps {
  onComplete?: () => void;
  isModal?: boolean;
}

const GenZenConversationalForm: React.FC<GenZenConversationalFormProps> = ({ onComplete, isModal = false }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > -1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleChange = (name: string, value: any) => {
    setAnswers({ ...answers, [name]: value });
    // Clear "Other" details if user changes away from "Other" option
    if (answers[name] === 'Other' && value !== 'Other') {
      setAnswers(prev => ({ ...prev, [`${name}OtherDetails`]: '' }));
    }
  };

  const handleMultiSelectChange = (name: string, option: string, checked: boolean) => {
    const currentValues = answers[name] || [];
    if (checked) {
      setAnswers({ ...answers, [name]: [...currentValues, option] });
    } else {
      setAnswers({ ...answers, [name]: currentValues.filter((item: string) => item !== option) });
      // Clear the "Other" details when unchecking "Other"
      if (option === 'Other') {
        setAnswers(prev => ({ ...prev, [`${name}OtherDetails`]: '' }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare form data including "Other" details
      const submissionData = { ...answers };
      
      // Add "Other" details to multiselect fields where applicable
      Object.keys(answers).forEach(key => {
        if (key.endsWith('OtherDetails') && answers[key]) {
          const baseKey = key.replace('OtherDetails', '');
          if (Array.isArray(submissionData[baseKey]) && submissionData[baseKey].includes('Other')) {
            // Replace "Other" with the actual details
            const index = submissionData[baseKey].indexOf('Other');
            submissionData[baseKey][index] = `Other: ${answers[key]}`;
          }
          // Remove the separate details field
          delete submissionData[key];
        }
      });

      console.log('Submitting GenZen Pro Application:', submissionData);
      
      // Submit to Notion API
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result = await response.json();
      console.log('Application submitted successfully:', result);
      
      setSubmitted(true);
      
      // Auto-redirect to thank you page after 3 seconds
      setTimeout(() => {
        if (onComplete) {
          onComplete(); // Close modal first
        }
        window.location.href = '/application-submitted';
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      // You could add error state handling here
      alert('There was an error submitting your application. Please try again.');
    }
  };

  const progress = currentQuestion > -1 ? ((currentQuestion + 1) / (questions.length + 1)) * 100 : 0;

  if (submitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-12 max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            <div className="w-16 h-px bg-foreground/20 mx-auto"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[0.9] text-foreground">
              Thank You!
            </h1>
            <p className="text-base sm:text-lg font-light leading-relaxed text-foreground/80 max-w-xl mx-auto">
              Your application has been submitted successfully. Redirecting to your resources...
            </p>
          </div>
          <div className="pt-8">
            <div className="inline-flex items-center space-x-3 text-sm font-light tracking-widest uppercase text-foreground/60">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span>Redirecting...</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={isModal ? "w-full flex flex-col" : "min-h-screen w-full flex flex-col"}>
      <div className={isModal ? "flex flex-col" : "flex-1 flex flex-col"}>
        {/* Fixed Progress Bar at Top */}
        <div className="w-full bg-background/95 backdrop-blur-sm px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto">
            <Progress value={progress} className="mb-2" />
            <div className="flex justify-between items-center text-xs font-light tracking-widest uppercase text-foreground/60">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={isModal ? "flex flex-col justify-start px-3 sm:px-6 pt-2 sm:pt-4 overflow-x-hidden" : "flex-1 flex flex-col justify-start px-6 pt-8"}>
          <div className="w-full max-w-3xl mx-auto my-6 sm:my-10">
            <AnimatePresence mode="wait">
              {currentQuestion === -1 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-center space-y-12"
                >
                  <div className="space-y-6 sm:space-y-8">
                    <div className="w-16 h-px bg-foreground/20 mx-auto"></div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[0.9] text-foreground px-2">
                      Ready to apply for your 
                      <span className="block">Power Dynamics Blueprint?</span>
                    </h1>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-foreground/80 max-w-xl mx-auto px-2">
                    Let's start with a strategic evaluation to understand your situation and design your protection framework.
                  </p>
                  <Button 
                    onClick={() => setCurrentQuestion(0)}
                    variant="outline"
                    size="lg"
                    className="font-light text-base px-8 py-3 border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 hover:text-primary rounded-full"
                  >
                    Begin Your Application
                  </Button>
                </motion.div>
              )}
              {currentQuestion > -1 && currentQuestion < questions.length && (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-4 py-12"
                >
                  <div className="text-center space-y-6">
                    <div className="space-y-3">
                      <div className="text-sm font-light tracking-widest uppercase text-foreground/60">
                        Question {currentQuestion + 1} of {questions.length}
                      </div>
                    </div>
                    <label htmlFor={questions[currentQuestion].name} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.1] text-foreground block px-2">
                      {questions[currentQuestion].question}
                    </label>
                  </div>
                  <div className="flex justify-center px-2">
                    <div className="w-full max-w-2xl">
                      {questions[currentQuestion].type === 'text' && (
                        <Input
                          id={questions[currentQuestion].name}
                          type="text"
                          className="w-full p-4 text-lg font-light text-center bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
                          onChange={(e) => handleChange(questions[currentQuestion].name, e.target.value)}
                          value={answers[questions[currentQuestion].name] || ''}
                          autoFocus
                        />
                      )}
                      {questions[currentQuestion].type === 'email' && (
                        <Input
                          id={questions[currentQuestion].name}
                          type="email"
                          className="w-full p-4 text-lg font-light text-center bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
                          onChange={(e) => handleChange(questions[currentQuestion].name, e.target.value)}
                          value={answers[questions[currentQuestion].name] || ''}
                          autoFocus
                        />
                      )}
                      {questions[currentQuestion].type === 'textarea' && (
                        <Textarea
                          id={questions[currentQuestion].name}
                          className="w-full p-4 text-lg font-light min-h-[120px] bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300 resize-none"
                          onChange={(e) => handleChange(questions[currentQuestion].name, e.target.value)}
                          value={answers[questions[currentQuestion].name] || ''}
                          autoFocus
                        />
                      )}
                      {questions[currentQuestion].type === 'select' && (
                        <div className="space-y-4">
                          <Select onValueChange={(value) => handleChange(questions[currentQuestion].name, value)} value={answers[questions[currentQuestion].name] || ''}>
                            <SelectTrigger className="w-full p-4 text-lg font-light bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300">
                              <SelectValue placeholder="Select an option" className="font-light" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-foreground/20">
                              {questions[currentQuestion].options?.map((option) => (
                                <SelectItem key={option} value={option} className="text-lg font-light hover:bg-secondary/30 p-3">
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {answers[questions[currentQuestion].name] === 'Other' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Input
                                type="text"
                                placeholder="Please specify..."
                                className="w-full p-3 text-lg font-light bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
                                onChange={(e) => handleChange(`${questions[currentQuestion].name}OtherDetails`, e.target.value)}
                                value={answers[`${questions[currentQuestion].name}OtherDetails`] || ''}
                              />
                            </motion.div>
                          )}
                        </div>
                      )}
                      {questions[currentQuestion].type === 'multiselect' && (
                        <div className="space-y-4">
                          {questions[currentQuestion].options?.map((option) => (
                            <div key={option} className="space-y-3">
                              <div className="flex items-start space-x-4 p-4 border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors duration-300">
                                <Checkbox
                                  id={`${questions[currentQuestion].name}-${option}`}
                                  checked={(answers[questions[currentQuestion].name] || []).includes(option)}
                                  onCheckedChange={(checked) => 
                                    handleMultiSelectChange(questions[currentQuestion].name, option, checked as boolean)
                                  }
                                  className="mt-1"
                                />
                                <label 
                                  htmlFor={`${questions[currentQuestion].name}-${option}`}
                                  className="text-base font-light text-foreground leading-relaxed cursor-pointer flex-1"
                                >
                                  {option}
                                </label>
                              </div>
                              {option === 'Other' && (answers[questions[currentQuestion].name] || []).includes('Other') && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="ml-8"
                                >
                                  <Input
                                    type="text"
                                    placeholder="Please specify..."
                                    className="w-full p-3 text-base font-light bg-background border-2 border-foreground/20 rounded-lg focus:border-primary focus:ring-0 transition-all duration-300"
                                    onChange={(e) => handleChange(`${questions[currentQuestion].name}OtherDetails`, e.target.value)}
                                    value={answers[`${questions[currentQuestion].name}OtherDetails`] || ''}
                                  />
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              {currentQuestion === questions.length && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-12"
                >
                  <div className="text-center space-y-8">
                    <div className="space-y-4">
                      <div className="w-16 h-px bg-foreground/20 mx-auto"></div>
                      <div className="text-sm font-light tracking-widest uppercase text-foreground/60">
                        Final Review
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-[1.2] text-foreground">
                      Review Your Application
                    </h2>
                  </div>
                  <div className="space-y-6 max-w-4xl mx-auto">
                    {questions.map((q, i) => {
                      const answerValue = answers[q.name];
                      const otherDetails = answers[`${q.name}OtherDetails`];
                      let displayValue = 'Not answered';
                      
                      if (Array.isArray(answerValue)) {
                        const values = [...answerValue];
                        if (values.includes('Other') && otherDetails) {
                          const otherIndex = values.indexOf('Other');
                          values[otherIndex] = `Other: ${otherDetails}`;
                        }
                        displayValue = values.join(', ') || 'Not answered';
                      } else {
                        if (answerValue === 'Other' && otherDetails) {
                          displayValue = `Other: ${otherDetails}`;
                        } else {
                          displayValue = answerValue || 'Not answered';
                        }
                      }
                      
                      return (
                        <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-secondary/20 border border-foreground/10 rounded-lg hover:bg-secondary/30 transition-all duration-300">
                          <p className="font-light text-foreground/80 text-base">{q.question}</p>
                          <p className="text-foreground font-light text-base lg:text-right">
                            {displayValue}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Navigation - Now inside content area */}
            <div className="w-full max-w-2xl mx-auto flex justify-between items-center mt-12">
              {currentQuestion > -1 ? (
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  size="lg"
                  className="font-light text-base px-8 py-3 border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 hover:text-primary rounded-full"
                >
                  Previous
                </Button>
              ) : <div />}
              {currentQuestion < questions.length -1 ? (
                <Button 
                  onClick={handleNext}
                  variant="outline"
                  size="lg"
                  className="font-light text-base px-8 py-3 border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 hover:text-primary rounded-full"
                >
                  Next
                </Button>
              ) : currentQuestion === questions.length -1 ? (
                  <Button 
                    onClick={handleNext}
                    variant="outline"
                    size="lg"
                    className="font-light text-base px-8 py-3 border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 hover:text-primary rounded-full"
                  >
                    Review
                  </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  variant="outline"
                  size="lg"
                  className="font-light text-base px-8 py-3 border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 hover:text-primary rounded-full"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenZenConversationalForm;