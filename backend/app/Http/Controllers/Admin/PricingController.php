<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PricingController extends Controller
{
    /**
     * Display a listing of pricing plans.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $language = $request->input('language', 'en');
        $perPage = $request->input('per_page', 15);

        $plans = PricingPlan::language($language)
            ->ordered()
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $plans
        ]);
    }

    /**
     * Store a newly created pricing plan.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|in:en,ar',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_monthly' => 'required|numeric|min:0',
            'price_yearly' => 'required|numeric|min:0',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'is_popular' => 'nullable|boolean',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $plan = PricingPlan::create([
                'language' => $request->language,
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'description' => $request->description,
                'price_monthly' => $request->price_monthly,
                'price_yearly' => $request->price_yearly,
                'features' => $request->features,
                'is_popular' => $request->is_popular ?? false,
                'order' => $request->order ?? 0,
                'is_active' => $request->is_active ?? true,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pricing plan created successfully',
                'data' => $plan
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create pricing plan',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Display the specified pricing plan.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $plan = PricingPlan::find($id);

        if (!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Pricing plan not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $plan
        ]);
    }

    /**
     * Update the specified pricing plan.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $plan = PricingPlan::find($id);

        if (!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Pricing plan not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'language' => 'sometimes|in:en,ar',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price_monthly' => 'sometimes|numeric|min:0',
            'price_yearly' => 'sometimes|numeric|min:0',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'is_popular' => 'nullable|boolean',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $updateData = $request->only([
                'language', 'name', 'description', 'price_monthly', 
                'price_yearly', 'features', 'is_popular', 'order', 'is_active'
            ]);

            if (isset($updateData['name'])) {
                $updateData['slug'] = Str::slug($updateData['name']);
            }

            $plan->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Pricing plan updated successfully',
                'data' => $plan->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update pricing plan',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Remove the specified pricing plan.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $plan = PricingPlan::find($id);

        if (!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Pricing plan not found'
            ], 404);
        }

        try {
            $plan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pricing plan deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete pricing plan',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Toggle pricing plan active status.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle($id)
    {
        $plan = PricingPlan::find($id);

        if (!$plan) {
            return response()->json([
                'success' => false,
                'message' => 'Pricing plan not found'
            ], 404);
        }

        try {
            $plan->update(['is_active' => !$plan->is_active]);

            return response()->json([
                'success' => true,
                'message' => 'Pricing plan status updated successfully',
                'data' => $plan->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle pricing plan status',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}
